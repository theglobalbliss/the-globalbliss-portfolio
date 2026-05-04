export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const supabase = useSupabase();

  const getSessionId = () => {
    const key = "globalbliss_analytics_session_id";

    let sessionId = localStorage.getItem(key);

    if (!sessionId) {
      sessionId = `${Date.now()}-${Math.random().toString(36).substring(2)}`;
      localStorage.setItem(key, sessionId);
    }

    return sessionId;
  };

  const getDeviceType = () => {
    const userAgent = navigator.userAgent || "";

    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      return "Tablet";
    }

    if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(userAgent)) {
      return "Mobile";
    }

    return "Desktop";
  };

  const getBrowser = () => {
    const userAgent = navigator.userAgent || "";

    if (userAgent.includes("Edg")) return "Microsoft Edge";
    if (userAgent.includes("Chrome")) return "Chrome";
    if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "Safari";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera";

    return "Unknown";
  };

  const trackPageView = async (path) => {
    try {
      await supabase.from("page_views").insert({
        page_path: path,
        page_title: document.title || "The GlobalBliss Brand",
        referrer: document.referrer || "",
        user_agent: navigator.userAgent || "",
        device_type: getDeviceType(),
        browser: getBrowser(),
        session_id: getSessionId(),
      });
    } catch (error) {
      console.error("Analytics tracking error:", error);
    }
  };

  nuxtApp.hook("page:finish", () => {
    trackPageView(router.currentRoute.value.fullPath);
  });
});