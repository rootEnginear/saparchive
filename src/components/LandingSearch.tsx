import { component$, useSignal } from "@builder.io/qwik";
import type { AVAILABLE_DATASETS } from "./Search";
import { Search } from "./Search";

export const LandingSearch = component$(() => {
  const currentDataset = useSignal<AVAILABLE_DATASETS>(26);

  return (
    <>
      <Search key={currentDataset.value} era={currentDataset.value} />
      <div class="flex items-center justify-end gap-10 pt-10">
        <strong class="text-sm/1.5">ค้นหาจาก</strong>
        <label class="label gap-5 p-0 cursor-pointer">
          <input
            type="radio"
            name="dataset"
            class="radio radio-xs radio-primary"
            checked={currentDataset.value === 25}
            onChange$={(_, el) => {
              if (el.checked) currentDataset.value = 25;
            }}
          />
          <span class="label-text text-xs/1.5">
            ชุดที่ 25 <span class="hidden 2xs:inline">(3.8Mb)</span>
          </span>
        </label>
        <label class="label gap-5 p-0 cursor-pointer">
          <input
            type="radio"
            name="dataset"
            class="radio radio-xs radio-primary"
            checked={currentDataset.value === 26}
            onChange$={(_, el) => {
              if (el.checked) currentDataset.value = 26;
            }}
          />
          <span class="label-text text-xs/1.5">
            ชุดที่ 26 <span class="hidden 2xs:inline">(2.6Mb)</span>
          </span>
        </label>
      </div>
    </>
  );
});
