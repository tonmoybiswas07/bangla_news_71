import { connection } from "next/server";

const HeaderDate = async () => {
await connection();

const date = new Date().toLocaleDateString("bn-BD", {
dateStyle: "full",
timeZone: "Asia/Dhaka",
});

return <p>{date}</p>;
};

export default HeaderDate;
