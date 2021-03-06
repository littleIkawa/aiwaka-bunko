import { Timestamp } from "@firebase/firestore";

const dayStr = ["日", "月", "火", "水", "木", "金", "土"];
export const requestTypeStr = [
  "意見",
  "修正依頼",
  "GitHubリポジトリ参加依頼",
  "その他",
];

export class DocumentRequest {
  constructor(
    public id: string,
    public uid: string,
    public type: number,
    public target: string,
    public time: Timestamp,
    public message: string,
    public status: number
  ) {}

  public getDate(): string {
    const dateObj: Date = this.time.toDate();
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // getMonthは0始まり
    const date = dateObj.getDate();
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    const second = dateObj.getSeconds();
    const day = dayStr[dateObj.getDay()];
    return `${year}年${month}月${date}日（${day}） ${hour}時${minute}分${second}秒`;
  }
  public getTime(): string {
    const dateObj: Date = this.time.toDate();
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    // const second = dateObj.getSeconds();
    return `${hour}時${minute}分`;
  }
  public getTypeStr(): string {
    return requestTypeStr[this.type];
  }
}
