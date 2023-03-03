import axios, { AxiosResponse } from "axios";
import { useState } from "react";

const HelpSystem = () => {
  const [Status, setStatus] = useState("");
  // HTTPリクエストを送信してステータスを取得する関数
  async function getStatus(url: string): Promise<string> {
    try {
      const response: AxiosResponse = await axios.get(url);
      return response.statusText;
    } catch (error) {
      console.error(error);
      return "Error"; // エラーの場合は'Error'を返す
    }
  }

  // 使用例
  getStatus("https://wifi.harutiro.net/emergency/no")
    .then((status) => {
      console.log(`Status: ${status}`);
      setStatus(status);
    })
    .catch((error) => {
      console.error(error);
    });

  if (Status === "no") {
    // 通信が失敗した場合の処理
    alert("Wifi助けてシステムが作動しました！！");
    setStatus("alerted");
  }
};

export default HelpSystem;
