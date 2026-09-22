/** Keep mathematical limits visible; procedural review notes belong in analysis evidence. */
export function conciseLimitations(value: string): string {
  return value
    .split(/[。；]/)
    .map((s) => s.trim())
    .filter(
      (s) =>
        s &&
        !/^(?:本条依据官方摘要整理|已读\s*PDF|AI\s*披露(?:以|另见)|未逐条核验证明|(?:尚未|未)(?:独立核验|逐条核验|复核|核验正文证明))/.test(
          s,
        ),
    )
    .join('；');
}
