// نظام الربح 70/30
const PROFIT_HOST = 0.7;
const PROFIT_ADMIN = 0.3;

socket.on("send-gift", ({ roomId, fromUser, toHostId, gift }) => {
  // gift = { name: "أسد", coins: 5000 }
  if(users[fromUser].coins < gift.coins) return error "رصيد غير كافي";

  users[fromUser].coins -= gift.coins;
  users[toHostId].earnings += gift.coins * PROFIT_HOST; // ربح المذيعة
  // انت كتربح gift.coins * 0.3
  io.to(roomId).emit("gift-received", { gift });
});
