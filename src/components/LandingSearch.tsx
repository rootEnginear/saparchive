import { component$, useSignal } from "@builder.io/qwik";
import { Search } from "./Search";

const DATASETS = {
  25: {
    listUrl: "/data/25.json",
    indexUrl: "/data/25.index.json",
  },
  26: {
    listUrl: "/data/26.json",
    indexUrl: "/data/26.index.json",
  },
} as const;

export const LandingSearch = component$(() => {
  const currentDataset = useSignal<keyof typeof DATASETS>(26);

  return (
    <>
      <Search
        key={currentDataset.value}
        listUrl={DATASETS[currentDataset.value].listUrl}
        indexUrl={DATASETS[currentDataset.value].indexUrl}
      />
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
            ชุดที่ 26 <span class="hidden 2xs:inline">(720kb)</span>
          </span>
        </label>
      </div>
    </>
  );
});
