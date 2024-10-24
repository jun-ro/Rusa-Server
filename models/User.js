// user.ts
import { Model } from "../utils/Model.js";
import { Crypt } from "../utils/Crypt.js";

export class User extends Model {
	static table = "users";
	static fields = {
		id: "INTEGER PRIMARY KEY AUTOINCREMENT",
		username: "TEXT",
		password: "TEXT",
	};

	static async createUser(username, password){

		// Insert user into the database using ORM's insert method

		if(!this.validateUser(username)){
			throw new Error("Invalid username!")
		}

		if(!this.validatePassword(password)){
			throw new Error("Invalid password!")
		}

		for(const [_id, existingUser] of await this.getUsers()){
			if(existingUser === username) {
				throw new Error(`User already exists!`)
			}
		}
		
		const hashedPassword = await Crypt.hash(password);

		return await this.create({
			username: username,
			password: hashedPassword,
		});
	}

	static async getUsers(){
		return await this.all()
	}

	static validateUser(username){
		const validUserPattern = /^[0-9A-Za-z]{6,16}$/
		return validUserPattern.test(username)
	}

	static validatePassword(password){
		const validPasswordPattern = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/
		return validPasswordPattern.test(password)
	}
}

