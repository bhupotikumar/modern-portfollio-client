export const shareBlog = async ({ title, url }) => {
    if (!url) return false;

    // ✅ 1. Native Share (best for mobile)
    if (navigator.share) {
        try {
            await navigator.share({
                title,
                text: title,
                url,
            });
            return true;
        } catch (err) {
            // user cancelled → not an error
            console.log("Share cancelled");
        }
    }

    // ✅ 2. Clipboard fallback (desktop)
    try {
        await navigator.clipboard.writeText(url);

        // 👉 Replace alert with better UX later (toast)
        console.log("✅ Link copied to clipboard");

        return true;
    } catch (err) {
        console.error("❌ Clipboard failed", err);
    }

    // ✅ 3. Final fallback (old browsers)
    try {
        const tempInput = document.createElement("input");
        tempInput.value = url;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);

        console.log("✅ Fallback copy success");
        return true;
    } catch (err) {
        console.error("❌ Final fallback failed", err);
        return false;
    }
};