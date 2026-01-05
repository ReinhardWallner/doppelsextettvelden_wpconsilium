function getKeySignature(input) {
    if (typeof input !== "string") return null;

    const parts = input.split("/");
    if(parts.length > 0)
        return parts[0].trim();

    return null;
}

function getTones(input) {
    if (typeof input !== "string") return null;

    const parts = input.split("/");
    if(parts.length > 1)
        return parts[1].trim();

    return null;
}