import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';


@Schema()
export class User extends Document {

    @Prop({
        unique: true,
        required: true,
    })
    username: string;

    @Prop({
        unique: true,
        required: true,
        lowercase: true,
    })
    email: string;

    @Prop({
        unique: true,
        required: true,
        select: false,
    })
    password: string;

    @Prop({ default: true })
    isActive: string;

    @Prop({ default: ['user'] })
    roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);