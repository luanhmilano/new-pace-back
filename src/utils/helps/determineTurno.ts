export const determineTurno = (hora: string): string => {
    const [hour] = hora.split(':').map(Number);
    return hour < 13 ? 'MANHÃ' : 'TARDE';
};