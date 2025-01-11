import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {

    @Prop({
        unique: true,
        required: true,
    })
    username: string;

    @Prop({
        unique: true,
        required: true,
    })
    email: string;

    @Prop({
        unique: true,
        required: true,
        select: false
    })
    password: string;

    @Prop({ default: true })
    isActive: string;

    @Prop({ default: ['user'] })
    roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);