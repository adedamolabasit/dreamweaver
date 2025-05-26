export const responseHandler = (message = 'success', payload?: { [key: string]: any } | any[]): { success: boolean; message: string; data: any } => {
  return {
    success: true,
    message,
    data: payload || null
  };
};