import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import AppError from "../errors/AppError";
import Category from "./Category";

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')  
  id: string;

  @Column()
  title: string;

  @Column()
  type: 'income' | 'outcome';

  @Column({type:'decimal', scale:2, precision: 16})
  value: number;

  @Column()
  category_id: string;

  @ManyToOne(() => Category)
  @JoinColumn({name: 'category_id'})
  category: Category

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
