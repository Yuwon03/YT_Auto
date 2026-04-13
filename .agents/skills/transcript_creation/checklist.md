# transcript_creation Checklist

- Source story file exists and is readable.
- Source story artifact handoff status is checked before conversion.
- `run_id` is explicit and consistent with upstream.
- Narration style (`cinematic`, `calm_sleep`, `neutral`) is explicitly chosen.
- Segment order matches original story sequence.
- Every segment row has pause value and duration estimate.
- No segment exceeds practical TTS limits for chosen runtime.
- Transcript text and segment CSV are both produced.
- Transcript outputs include lineage/handoff metadata.
