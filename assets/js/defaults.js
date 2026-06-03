const SLOT_COUNT = 9;

// Top 9 platforms by global reach (2024–2025), ordered by usage.
// Icons: Font Awesome 4 (bundled). TikTok/Telegram use the closest FA4 glyph.
const DEFAULT_SLOTS = [
  {
    name: "LinkedIn",
    link_direct: "https://www.linkedin.com",
    link_lmid: "https://www.linkedin.com/in/",
    icon: "fa-linkedin",
  },
  {
    name: "YouTube",
    link_direct: "https://www.youtube.com",
    link_lmid: "https://www.youtube.com/@",
    icon: "fa-youtube",
  },
  {
    name: "Instagram",
    link_direct: "https://www.instagram.com",
    link_lmid: "https://www.instagram.com/",
    icon: "fa-instagram",
  },
  {
    name: "TikTok",
    link_direct: "https://www.tiktok.com",
    link_lmid: "https://www.tiktok.com/@",
    icon: "fa-video-camera",
  },
  {
    name: "Facebook",
    link_direct: "https://www.facebook.com",
    link_lmid: "https://www.facebook.com/",
    icon: "fa-facebook",
  },
  {
    name: "X",
    link_direct: "https://x.com",
    link_lmid: "https://x.com/",
    icon: "fa-twitter",
  },
  {
    name: "Snapchat",
    link_direct: "https://www.snapchat.com",
    link_lmid: "https://www.snapchat.com/add/",
    icon: "fa-snapchat",
  },
  {
    name: "Reddit",
    link_direct: "https://www.reddit.com",
    link_lmid: "https://www.reddit.com/user/",
    icon: "fa-reddit",
  },
  {
    name: "WhatsApp",
    link_direct: "https://web.whatsapp.com",
    link_lmid: "https://wa.me/",
    icon: "fa-whatsapp",
  },
];

const ICON_OPTIONS = {
  default: [
    { value: "fa-globe", label: "Globe" },
    { value: "fa-user", label: "User" },
    { value: "fa-folder", label: "Folder" },
    { value: "fa-link", label: "Link" },
    { value: "fa-tag", label: "Tag" },
    { value: "fa-bookmark", label: "Bookmark" },
    { value: "fa-star", label: "Star" },
    { value: "fa-heart", label: "Heart" },
  ],
  // Sorted by global usage / relevance (FA4 brand icons only).
  brands: [
    { value: "fa-linkedin", label: "LinkedIn" },
    { value: "fa-youtube", label: "YouTube" },
    { value: "fa-instagram", label: "Instagram" },
    { value: "fa-video-camera", label: "TikTok" },
    { value: "fa-facebook", label: "Facebook" },
    { value: "fa-twitter", label: "X (Twitter)" },
    { value: "fa-snapchat", label: "Snapchat" },
    { value: "fa-reddit", label: "Reddit" },
    { value: "fa-whatsapp", label: "WhatsApp" },
    { value: "fa-pinterest", label: "Pinterest" },
    { value: "fa-wechat", label: "WeChat" },
    { value: "fa-paper-plane", label: "Telegram" },
    { value: "fa-twitch", label: "Twitch" },
    { value: "fa-github", label: "GitHub" },
    { value: "fa-slack", label: "Slack" },
    { value: "fa-spotify", label: "Spotify" },
    { value: "fa-medium", label: "Medium" },
    { value: "fa-tumblr", label: "Tumblr" },
    { value: "fa-vimeo", label: "Vimeo" },
    { value: "fa-soundcloud", label: "SoundCloud" },
    { value: "fa-stack-overflow", label: "Stack Overflow" },
    { value: "fa-behance", label: "Behance" },
    { value: "fa-dribbble", label: "Dribbble" },
    { value: "fa-flickr", label: "Flickr" },
    { value: "fa-skype", label: "Skype" },
    { value: "fa-vk", label: "VK" },
    { value: "fa-weibo", label: "Weibo" },
    { value: "fa-bitbucket", label: "Bitbucket" },
    { value: "fa-xing", label: "Xing" },
  ],
};

function buildDefaultStoragePayload() {
  const payload = {};
  DEFAULT_SLOTS.forEach((slot, index) => {
    const n = index + 1;
    payload[`name_${n}`] = slot.name;
    payload[`link_direct_${n}`] = slot.link_direct;
    payload[`link_lmid_${n}`] = slot.link_lmid;
    payload[`icon_${n}`] = slot.icon;
  });
  return payload;
}

function storageKeysForAllSlots() {
  const keys = [];
  for (let i = 1; i <= SLOT_COUNT; i++) {
    keys.push(`name_${i}`, `link_direct_${i}`, `link_lmid_${i}`, `icon_${i}`);
  }
  return keys;
}
