import { ObjectId } from "mongodb";

export interface Blog {
	_id: ObjectId;
	blogTitle: string;
	blogDate: string;
	// Add other properties as needed
}

export interface Event {
	_id?: ObjectId;
	name: string;
	date: Date;
	location: string;
	description: string;
}
