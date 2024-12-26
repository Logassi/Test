import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// From my understanding, Schema is a guideline on how each field of the database should look like
// While DTO is a guideline for how frontend/backend using postman, sending a request

// @Schema({ strict: true }) // Ensures only defined fields are allowed
@Schema()
export class User {
  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  birthday?: string;

  // +++++++++++++++++++++++++++
  // field below need to be auto generate, when the birthday set, do calculation to determine horoscope and zodiac
  @Prop({ required: false })
  horoscope?: string;

  @Prop({ required: false })
  zodiac?: string;
  // +++++++++++++++++++++++++++

  @Prop({ required: false })
  height?: number;

  @Prop({ required: false })
  weight?: number;

  @Prop({ required: false })
  interests?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
