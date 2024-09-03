export const mockLogin = async (email, password) => {

    await new Promise(resolve => setTimeout(resolve, 1000));
  
    return { message: 'Login successful!' };
  };