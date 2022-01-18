import { Injectable } from "@angular/core";
@Injectable()
export class Users {
    public userList = [
        {
            id: "1",
            username: "Krishtec",
            name: "KRISHTEC",
            password: "krishtec",
            company: "Krish Tec",
            contact: "1234567890",
            email: "abc@gmail.com",
            role: "Admin",
            device: "",
            chart: [],
            input: "",
            plan: "floor",
            floor_plan: {
                totalFloors: 2
            }
        },
        {
            id: "2",
            username: "user",
            name: "Veera",
            password: "user",
            company: "Krish Tec",
            contact: "1234567890",
            email: "abc@gmail.com",
            role: "User",
            device: "",
            chart: [],
            input: "",
            plan: "floor",
            floor_plan: {
                totalFloors: 2
            }
        }
    ]
}
