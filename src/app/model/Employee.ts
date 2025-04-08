export class Employee 
    {
        employeeId: number;
        employeeName: string;
        contactNo: string;
        emailId: string;
        deptId: number;
        password: string;
        gender: string;
        role: string;
        createdDate: Date;
        
        constructor(){
            this.employeeId= 0;
            this.employeeName = "";
            this.contactNo = "";
            this.emailId = "";
            this.deptId = 0;
            this.password = "";
            this.gender = "";
            this.role = "Employee";
            this.createdDate = new Date();
        }
    }

export interface IApiResponse{
    message: string;
    result: boolean;
    data: any;
}

