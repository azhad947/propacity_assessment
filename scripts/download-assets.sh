set -euo pipefail

DEST="public/images"
BASE="https://www.murec.com/images"
REFERER="https://www.murec.com/"

FILES=(
  bjaja.webp
  bobyloog.png
  desingform.png
  homevideo.mp4
  madhusudan.png
  madhusudan.webp
  murec.png
  murec.webp
  o2.webp
  o5.webp
  o6.webp
  team_2.webp
  team_3.webp
  tq.webp
)

mkdir -p "$DEST"

for file in "${FILES[@]}"; do
  echo "Downloading $file..."
  curl -sSL \
    -H "Referer: $REFERER" \
    -H "Origin: https://www.murec.com" \
    -H "User-Agent: Mozilla/5.0" \
    -o "$DEST/$file" \
    "$BASE/$file"
done

echo ""
echo "Done. Files saved to $DEST/"
ls -lh "$DEST"
