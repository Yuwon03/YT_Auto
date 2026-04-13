# tts_creation Checklist

- Transcript source path is explicit.
- Voice profile (`provider`, `voice_id`, `rate`, `pitch`) is explicit.
- Runtime availability is checked before generation.
- Success path writes audio file and metadata json.
- Failure path writes actionable request doc and metadata json.
- Metadata includes source transcript and generation status.
