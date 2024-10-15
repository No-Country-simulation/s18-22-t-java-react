export interface Hours {
    hour: string
}

export const hourData = [
    { hour: "07:00" },
    { hour: "07:30" },
    { hour: "08:00" },
    { hour: "08:30" },
    { hour: "09:00" },
    { hour: "09:30" },
    { hour: "10:00" },
    { hour: "10:30" },
    { hour: "11:00" },
    { hour: "11:30" },
    { hour: "12:00" },
    { hour: "12:30" },
    { hour: "13:00" },
    { hour: "13:30" },
    { hour: "14:00" },
    { hour: "14:30" },
    { hour: "15:00" },
    { hour: "15:30" },
    { hour: "16:00" },
    { hour: "16:30" },
    { hour: "17:00" },
    { hour: "17:30" },
    { hour: "18:00" },
];

export const splitHours = (hours: Hours[]) => {
    const amHours = hours.filter(item => parseInt(item.hour) < 12);
    const pmHours = hours.filter(item => parseInt(item.hour) >= 12);
    return { amHours, pmHours };
};