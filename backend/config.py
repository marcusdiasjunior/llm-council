"""Configuration for the LLM Council."""

import os
from dotenv import load_dotenv

load_dotenv()

# OpenRouter API key
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# Council members - list of OpenRouter model identifiers
COUNCIL_MODELS = [
    "openai/gpt-5.1",
    "google/gemini-3-pro-preview",
    "anthropic/claude-sonnet-4.5",
    "x-ai/grok-4",
]

# Chairman model - synthesizes final response
CHAIRMAN_MODEL = "google/gemini-3-pro-preview"

# OpenRouter API endpoint
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

# Providers to exclude from routing, by OpenRouter provider slug.
#
# Requests already deny providers that train on prompts (see openrouter.py),
# but OpenRouter does not route on data *retention*, so providers that retain
# prompts are still eligible. To exclude them, list their slugs here. Get the
# current policies and slugs with:
#
#   curl -s https://openrouter.ai/api/frontend/v1/all-providers \
#     | jq -r '.data[] | [.name, (.dataPolicy.retentionDays // "?"),
#                         (.dataPolicy.training // false)] | @tsv' | sort
#
# Narrowing this too far can leave a model with no eligible provider; the
# council logs any model that drops out so a silent shrink is visible.
PROVIDER_DENYLIST = []

# Data directory for conversation storage
DATA_DIR = "data/conversations"
