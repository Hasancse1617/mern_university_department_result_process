export const getGradeSingleSubject =(mark)=>{
    let point = 0.00;
    let grade = "F";
    if(mark >= 80 && mark <= 100){
        point = 4.00;
        grade = "A+";
    }else if(mark >= 75 && mark <= 79){
        point = 3.75;
        grade = "A";
    }else if(mark >= 70 && mark <= 74){
        point = 3.50;
        grade = "A-";
    }else if(mark >= 65 && mark <= 69){
        point = 3.25;
        grade = "B+";
    }else if(mark >= 60 && mark <= 64){
        point = 3.00;
        grade = "B";
    }else if(mark >= 55 && mark <= 59){
        point = 2.75;
        grade = "B-";
    }else if(mark >= 50 && mark <= 54){
        point = 2.50;
        grade = "C+";
    }else if(mark >= 45 && mark <= 49){
        point = 2.25;
        grade = "C";
    }else if(mark >= 40 && mark <= 44){
        point = 2.00;
        grade = "D";
    }else{
        point = 0.00;
        grade = "F";
    }
    return grade;
}

export const getPointSingleSubject =(mark)=>{
    let point = 0.00;
    let grade = "F";
    if(mark >= 80 && mark <= 100){
        point = 4.00;
        grade = "A+";
    }else if(mark >= 75 && mark <= 79){
        point = 3.75;
        grade = "A";
    }else if(mark >= 70 && mark <= 74){
        point = 3.50;
        grade = "A-";
    }else if(mark >= 65 && mark <= 69){
        point = 3.25;
        grade = "B+";
    }else if(mark >= 60 && mark <= 64){
        point = 3.00;
        grade = "B";
    }else if(mark >= 55 && mark <= 59){
        point = 2.75;
        grade = "B-";
    }else if(mark >= 50 && mark <= 54){
        point = 2.50;
        grade = "C+";
    }else if(mark >= 45 && mark <= 49){
        point = 2.25;
        grade = "C";
    }else if(mark >= 40 && mark <= 44){
        point = 2.00;
        grade = "D";
    }else{
        point = 0.00;
        grade = "F";
    }
    return point;
}

export const findStudentGPA = (records) =>{
    // console.log(records);
    let total_point = 0;
    let total_credit = 0;
    let gpa = 0;
    for (let i = 0; i < records.length; i++) {
        let grade = getPointSingleSubject(records[i].marks.final_mark);
        let credit = parseFloat(records[i].subject[0].subject_credit);
        total_point += (grade * credit);
        total_credit += credit;
    }
    return (total_point/total_credit).toFixed(2);
    // console.log(total_credit, total_point)
}