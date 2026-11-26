#!/bin/bash
# main(원본 코드) → gh-pages(난독화된 배포본). 게임 사이트는 gh-pages 를 쓴다.
# 사용: bash tools/deploy.sh   (먼저 main 에 커밋·푸시)
set -e
ROOT=$(cd "$(dirname "$0")/.." && pwd); cd "$ROOT"
JO=${JO_PATH:-$(npm root -g)/javascript-obfuscator}
[ -d "$JO" ] || { mkdir -p /tmp/jo && (cd /tmp/jo && npm i javascript-obfuscator@4 >/dev/null 2>&1); JO=/tmp/jo/node_modules/javascript-obfuscator; }
WT=$(mktemp -d); git fetch -q origin gh-pages; git worktree add -q -f "$WT" origin/gh-pages
(cd "$WT" && git ls-files -z | xargs -0 rm -f); git ls-files -z | grep -zv "^tools/" | xargs -0 -I{} cp --parents {} "$WT"/
JO_PATH="$JO" node tools/build.js index.html "$WT/index.html"
cd "$WT"; git add -A; git commit -qm "배포: $(cd "$ROOT" && git log -1 --format=%s)" || true
git push -q origin HEAD:gh-pages; cd "$ROOT"; git worktree remove --force "$WT"; echo deployed
