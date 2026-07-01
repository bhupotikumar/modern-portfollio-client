export const getSocialUrl = (social = {}) => {
    const platform = (social.platform || "").toLowerCase();
    const value = social.value || social.url || "";

    switch (platform) {
        case "email":
            return `mailto:${value}?subject=Portfolio%20Contact`;

        case "whatsapp": {
            const phone = value.startsWith("0")
                ? "880" + value.slice(1)
                : value;

            return `https://wa.me/${phone}?text=Hi%20Bhupoti,%20I%20found%20your%20portfolio.`;
        }

        default:
            return value;
    }
};