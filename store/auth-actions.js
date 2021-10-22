
export function signUp(name, email, password) {
    return async (dispatch) => {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        // if (!response.ok) {
        //     throw new Error(data.message || 'Something went wrong!')
        // }

        console.log(data)
        return data;
    }
}