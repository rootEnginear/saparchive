import fs from "fs";
import { Agent } from "https";
import fetch from "node-fetch";
import all_raw from "./all_raw.json" assert { type: "json" };
import current_position from "./pos.json" assert { type: "json" };

const RAW_JSON = "fetcher/all_raw.json";
const POS_JSON = "fetcher/pos.json";

const START = 4494;
const EMPTY_TEMPLATE =
  '<script>\r\nfunction download_d(aid,mid){ \r\n\t\tvar link_t = \'main_warehouse_dll.php\';\r\n\t\tvar link_target = \'_blank\';\r\n\t\tdocument.getElementById(\'aid\').value = aid;\r\n\t\tdocument.getElementById(\'mid\').value = mid;\r\n\t\tdocument.getElementById(\'frmwh\').action = link_t;\r\n\t\tdocument.getElementById(\'frmwh\').target =link_target;\r\n\t\tdocument.getElementById(\'frmwh\').submit();\r\n\t\tadddownload(aid,mid);\r\n}\r\n</script>\r\n<table width="96%" border="0" align="center" cellpadding="0" cellspacing="8">\r\n<tr >\r\n    <td ><table width="100%" border="0" align="center" cellpadding="5" cellspacing="0">\r\n  <tr>\r\n    <td><br><span style="font-family: tahoma;font-size: 17px;"></span><hr size="1" color="#CCCCCC"></td>\r\n  </tr>\r\n</table></td>\r\n  </tr>\r\n  <tr>\r\n    <td><a href="#G" onClick="show_datawarehouse_list(\'\',\'\',\'\');" >หน้าหลัก</a>&nbsp;   <hr size="1" color="#CCCCCC"></td>\r\n  </tr>\r\n   <tr>\r\n    <td><strong></strong></td>\r\n  </tr>\r\n  <tr>\r\n    <td><a href="#detail" onClick="if(document.all.mydetail.style.display == \'\'){ document.all.mydetail.style.display = \'none\';document.all.mysrc.src=\'mainpic/arrow3.gif\'; }else{ document.all.mydetail.style.display = \'\';document.all.mysrc.src=\'mainpic/arrow2.gif\'; }"><strong>เรื่องที่พิจารณา</strong> <img id="mysrc" src="mainpic/arrow3.gif" width="7" height="7"align="absmiddle" border="0"  /></a></td>\r\n  </tr>\r\n  <tr id="mydetail" style="display:none">\r\n    <td>\r\n\t<br />\r\n\t</td>\r\n  </tr>\r\n    <tr>\r\n    <td>&nbsp;</td>\r\n  </tr>\r\n</table>\r\n';

const agent = new Agent({
  rejectUnauthorized: false,
});

const fetchData = async (id) => {
  console.log(Date.now(), `Fetching ${id}`);
  let resp = await fetch(
    "https://msbis.parliament.go.th/ewtadmin/ewt/parliament_report/main_warehouse_detail.php?mid=" +
      id,
    { agent }
  );
  let buffer = await resp.arrayBuffer();
  let decoder = new TextDecoder("tis-620");
  let res = decoder.decode(buffer);
  return res;
};

const fetchThru = async (arr) => {
  const len = arr.length;
  let result = [];

  result[0] = [arr[0], await fetchData(arr[0])];

  for (let i = 1; i < len; i++) {
    console.log(Date.now(), "Sleeping 5 seconds");
    await new Promise((r) => setTimeout(r, 5000));

    result[i] = [arr[i], await fetchData(arr[i])];
  }

  return result;
};

const getData = async (arr) => {
  const data = await fetchThru(arr);
  const ne_data = data.filter((d) => !d[1].includes(EMPTY_TEMPLATE));

  const json_data = ne_data.reduce((a, c) => ({ ...a, [c[0]]: c[1] }), {});
  const max = Math.max(...Object.keys(json_data)) + 1;

  // ถ้าไม่ได้บังคับดึงข้อมูล และ ไม่ได้มีอะไรอัพเดตเพิ่ม — หยุดเลย
  if (process.argv[2] !== "--force" && current_position.next === max)
    throw new Error("No new data");

  fs.writeFileSync(
    POS_JSON,
    JSON.stringify({
      next: max,
    })
  );

  fs.writeFileSync(
    RAW_JSON,
    JSON.stringify({
      ...all_raw,
      ...json_data,
    })
  );

  console.log("Fetch Done - Don't forget to run `pnpm process`!");
};

// Fetch 4 อันก่อนหน้า อันปัจจุบัน และ 5 อันอนาคต
getData(
  Array(10)
    .fill()
    .map((_, i) => i + current_position.next - 5)
    .filter((i) => i > START)
);
