# tts_creation Checklist

- Transcript source path is explicit.
- Transcript artifact handoff status is checked before TTS generation.
- `run_id` is explicit and consistent with upstream.
- Voice profile is explicit and uses `edge-tts` + Microsoft Neural Voice id.
- Runtime availability is checked before generation.
- Success path writes audio file and metadata json.
- Failure path writes actionable request doc and metadata json.
- Metadata includes source transcript and generation status.
- Metadata includes lineage/handoff fields.
