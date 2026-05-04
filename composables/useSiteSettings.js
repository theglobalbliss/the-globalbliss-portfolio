export const useSiteSettings = () => {
  const supabase = useSupabase();

  const getSiteSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("id, setting_key, setting_value, updated_at")
      .order("setting_key", { ascending: true });

    if (error) {
      console.error("Error loading site settings:", error.message);
      return {};
    }

    return (data || []).reduce((settings, item) => {
      settings[item.setting_key] = item.setting_value;
      return settings;
    }, {});
  };

  return {
    getSiteSettings,
  };
};