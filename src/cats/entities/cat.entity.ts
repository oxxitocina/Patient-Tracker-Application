import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  password: string
}
