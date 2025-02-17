import { Card } from "antd";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import PaymentList from "./paymentList";

const CardsStatistic = () => {
  const [stats, setStats] = useState<any>({
    allMoney: {},
    headPay: 0,
    payUser: 0,
    monthPay: 0,
    notPaidUsers: [],
    todayPaidUsers: [],
    monthPaidUsers: [],
  });

  console.log("stats", stats);

  const [modalData, setModalData] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${BASE_URL}/main/all`).then((res) => res.json()),
      fetch(`${BASE_URL}/main/notPayed`).then((res) => res.json()),
      fetch(`${BASE_URL}/main/today`).then((res) => res.json()),
      fetch(`${BASE_URL}/main/month`).then((res) => res.json()),
    ])
      .then(([allMoney, notPaid, today, month]) => {
        // console.log("Jami pul:", allMoney);
        // console.log("To'lamaganlar:", notPaid);
        // console.log("Bugun to'laganlar:", today);
        // console.log("Bu oy to'laganlar:", month);

        setStats({
          allMoney,
          headPay: notPaid || 0,
          payUser: today || 0,
          monthPay: month || 0,
          notPaidUsers: notPaid.result || [],
          todayPaidUsers: today.result || [],
          monthPaidUsers: month.result || [],
        });
      })
      .catch((error) => console.error("Xatolik:", error));
  }, []);
  return (
    <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
      <Card style={{ flex: 1, background: "#FFF0F5", border: 0 }}>
        <p className="text-gray-600 text-[18px]">Jami pul</p>
        <h2 className="text-[22px] font-bold w-full">
          {/* {parseInt(stats?.allMoney?.paid_money?.sum || 0, 10).toLocaleString()}{" "}
          / */}
          {parseInt(stats?.allMoney?.all_income?.sum || 0, 10).toLocaleString()}{" "}
          UZS
        </h2>
        <p className="text-gray-600 text-[18px]">
          {" "}
          {stats?.allMoney?.paid_users_count?.count || 0} /{" "}
          {stats?.allMoney?.income_users_count?.count || 0} kishi
        </p>
      </Card>
      <Card
        onClick={() =>
          setModalData({
            type: "notPaid",
            title: "To'lamaganlar Ro'yxati",
            users: stats.notPaidUsers,
          })
        }
        style={{ flex: 1, background: "#E6F7FF", border: 0 }}
      >
        <p className="text-gray-600 text-[18px]">To'lamaganlar</p>
        <h2 className="text-[22px] font-bold">
          {" "}
          {parseInt(stats?.headPay?.sum || 0, 10).toLocaleString()} UZS
        </h2>
        <p className="text-gray-600 text-[18px]">
          {" "}
          {stats.headPay?.count || 0} /{" "}
          {stats.allMoney?.income_users_count?.count || 0} kishi
        </p>
      </Card>
      <Card
        onClick={() =>
          setModalData({
            type: "monthPaid",
            title: "Bu oy to'laganlar",
            users: stats.monthPaidUsers,
          })
        }
        style={{ flex: 1, background: "#F6FFED", border: 0 }}
      >
        <p className="text-gray-600 text-[18px]">Bu oydagi to'lov</p>
        <h2 className="text-[22px] font-bold">
          {" "}
          {parseInt(stats?.monthPay?.sum || 0, 10).toLocaleString()} UZS
        </h2>
        <p className="text-gray-600 text-[18px]">
          {stats.monthPay?.count || 0} kishi
        </p>
      </Card>
      <Card
        onClick={() =>
          setModalData({
            type: "todayPaid",
            title: "Bugun to'laganlar",
            users: stats.todayPaidUsers,
          })
        }
        style={{ flex: 1, background: "#FFF7E6", border: 0 }}
      >
        <p className="text-gray-600 text-[18px]">Bugungi to'lov</p>
        <h2 className="text-[22px] font-bold">
          {" "}
          {parseInt(stats?.payUser?.sum || 0, 10).toLocaleString()} UZS
        </h2>
        <p className="text-gray-600 text-[18px]">
          {stats.payUser?.count || 0} kishi
        </p>
      </Card>
      {modalData && (
        <PaymentList
          type={modalData.type}
          users={modalData.users}
          onClose={() => setModalData(null)}
        />
      )}
    </div>
  );
};

export default CardsStatistic;
