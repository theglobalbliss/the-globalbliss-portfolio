export const useSiteSettings = () => {
  const supabase = useSupabase();

  const getSiteSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*");

    if (error) {
      console.error("Error loading site settings:", error.message);
      return {};
    }

    const settings = {};

    data.forEach((item) => {
      settings[item.setting_key] = item.setting_value;
    });

    return settings;
  };

  return {
    getSiteSettings,
  };
};