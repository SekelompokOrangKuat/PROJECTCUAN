import http from "../http-common";

class UserDataService {
    getAll() {
        return http.get("/auth/");
    }

    get(id) {
        return http.get(`/auth/${id}`);
    }

    create(data) {
        return http.post("/auth/signup", data);
    }

    update(id, data) {
        return http.put(`/auth/${id}`, data);
    }

    delete(id) {
        return http.delete(`/auth/${id}`);
    }

    deleteAll() {
        return HTMLParagraphElement.delete('/auth');
    }

    findByTitle(name) {
        return http.get(`/auth?name=${name}`);
    }

    login(data) {
        return http.post('auth/signin', data);
    }
}

export default new UserDataService();