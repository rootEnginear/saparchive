import type { Meeting } from "@/types/meetings";
import {
  component$,
  noSerialize,
  useComputed$,
  useSignal,
  useVisibleTask$,
  type NoSerialize,
} from "@builder.io/qwik";
import Fuse, { type RangeTuple } from "fuse.js";
import { SearchIcon } from "lucide-qwik";

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

export type AVAILABLE_DATASETS = keyof typeof DATASETS;

const highlightStringFromIndices = (
  string: String,
  readonlyIndices: readonly RangeTuple[]
) => {
  const indices = [...readonlyIndices];
  let result = string;
  let shift = 0;
  for (const [start, end] of indices) {
    const [s, e] = [start + shift, end + shift + 1];
    result = result.slice(0, s) + `<mark>${result.slice(s, e)}</mark>` + result.slice(e);
    shift += 13;
  }
  return result;
};

interface SearchProps {
  era: keyof typeof DATASETS;
}

export const Search = component$<SearchProps>((props) => {
  const fuseInstance = useSignal<NoSerialize<Fuse<Meeting>>>(undefined);

  useVisibleTask$(
    async () => {
      const meetings = (await fetch(DATASETS[props.era].listUrl).then((r) =>
        r.json()
      )) as Meeting[];
      const meetingsIndex = await fetch(DATASETS[props.era].indexUrl).then((r) =>
        r.json()
      );
      const fuse = new Fuse(
        meetings,
        {
          keys: ["title"],
          minMatchCharLength: 2,
          includeMatches: true,
          ignoreLocation: true,
          useExtendedSearch: true,
          threshold: 0.2,
        },
        Fuse.parseIndex(meetingsIndex)
      );
      fuseInstance.value = noSerialize(fuse);
    },
    {
      strategy: "document-idle",
    }
  );

  const query = useSignal("");

  const result = useComputed$(() => {
    const trimmedResult = query.value.trim();
    if (trimmedResult.length < 3) return [];
    return fuseInstance.value?.search(query.value.trim()) ?? [];
  });

  return (
    <div class="group">
      <label class="input input-bordered input-primary flex items-center gap-2">
        <span class="sr-only">ค้นหา</span>
        <input
          type="text"
          class="grow"
          placeholder={
            fuseInstance.value ? "ค้นหา (2 ตัวอักษรขึ้นไป)" : "กำลังโหลดข้อมูล…"
          }
          value={query.value}
          onInput$={(_, el) => {
            query.value = el.value;
          }}
          disabled={fuseInstance.value === undefined}
        />
        {fuseInstance.value ? (
          <SearchIcon size={20} />
        ) : (
          <span class="loading loading-spinner loading-sm" />
        )}
      </label>
      {query.value.trim().length > 2 && (
        <ul class="hidden group-focus-within:flex absolute menu bg-gray rounded-10 w-full mt-5 shadow-sm z-10 max-h-[30vh] flex-nowrap overflow-y-auto">
          {result.value.length > 0 ? (
            result.value.map(({ item, matches }) => (
              <li key={item.id}>
                <a
                  class="flex flex-col items-start gap-[7px] text-pretty p-10"
                  href={`/${props.era}/${item.id}`}
                >
                  <span
                    class="text-blue/40 [&_mark]:bg-transparent [&_mark]:font-bold [&_mark]:text-blue text-sm/1.5"
                    dangerouslySetInnerHTML={matches
                      ?.map((match) =>
                        highlightStringFromIndices(match.value ?? "", match.indices)
                      )
                      .join(" / ")}
                  />
                  <span class="bg-blue text-gray font-sans text-xs/1.5 px-5 p-1 w-full rounded-[3px]">
                    {item.id} - {item.no}
                  </span>
                </a>
              </li>
            ))
          ) : (
            <li class="disabled">
              <span class="p-10">ไม่พบข้อมูล</span>
            </li>
          )}
        </ul>
      )}
    </div>
  );
});
