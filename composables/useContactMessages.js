export const useContactMessages = () => {
  const supabase = useSupabase();

  const sendContactMessage = async (payload) => {
    const { data, error } = await supabase
      .from("contact_messages")
      .insert([
        {
          name: payload.name,
          email: payload.email,
          subject: payload.subject,
          message: payload.message,
          status: "unread",
          updated_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Error sending message to Supabase:", error.message);

      return {
        success: false,
        error: error.message,
      };
    }

    console.log("Message saved to Supabase:", data);

    return {
      success: true,
      data,
    };
  };

  return {
    sendContactMessage,
  };
};