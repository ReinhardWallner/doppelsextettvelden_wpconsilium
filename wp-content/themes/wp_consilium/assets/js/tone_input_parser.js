function getKeySignature(input) {
    if (typeof input !== "string") return null;

    const parts = input.split("/");
    if(parts.length > 0)
        return getFirstKeySignature(parts[0].trim());

    return null;
}

function getFirstKeySignature(str) {
  if (!str) return "";
  return str.split("->")[0];
}

function getTones(input, clearEmptyTones) {
    if (typeof input !== "string") return null;

    const parts = input.split("/");
    if(parts.length > 1) {
        if(clearEmptyTones) {
            return parts[1].replaceAll("-", " ").trim();
        } else{
            return parts[1].trim();
        }
    }

    return null;
}