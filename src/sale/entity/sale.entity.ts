import { PaymentMethod } from 'src/payment-method/entity/paymentMethod.entity';
import { SaleItem } from 'src/sale-item/entity/sale-item.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: false })
  userId: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({ default: 'PENDENTE' })
  status: 'PENDENTE' | 'PAGO' | 'CANCELADO';

  @ManyToOne(() => PaymentMethod, { eager: true })
  @JoinColumn({ name: 'paymentMethodId' })
  paymentMethod: PaymentMethod;

  @Column()
  paymentMethodId: number;
  @Column({ nullable: true, type: 'text' })
  observation?: string;

  @OneToMany(() => SaleItem, (item) => item.sale, {
    cascade: true,
    eager: true,
  })
  items: SaleItem[];
}
