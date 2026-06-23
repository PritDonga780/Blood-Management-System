const Notification =
  require("../models/Notification");

const addNotification =
  async (message) => {
    try {

      await Notification.create({
        message,
      });

      const notifications =
        await Notification.find()
          .sort({
            createdAt: -1,
          });

      if (
        notifications.length > 5
      ) {
        const extra =
          notifications.slice(5);

        for (
          const item of extra
        ) {
          await Notification.findByIdAndDelete(
            item._id
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

module.exports =
  addNotification;