import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'computers' })
export class Computer {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ unsigned: true, nullable: true })
    user_id: number

    @ManyToOne(type => User, user => user.id, { cascade: true, onDelete: "SET NULL" })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({
        unique: true
    })
    name: string;

    @Column({
        unique: true
    })
    number: string;

    @Column()
    memory: string;

    @Column()
    processor: string;

    @Column()
    disk_capacity:string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at: string;
}