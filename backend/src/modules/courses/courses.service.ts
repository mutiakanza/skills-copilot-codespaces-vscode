import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    title: string;
    description?: string;
    enrollKey?: string;
    startDate?: Date;
    endDate?: Date;
    instructorId: string;
  }) {
    return this.prisma.course.create({
      data,
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findAll(userId?: string, role?: string) {
    if (role === 'LECTURER') {
      return this.prisma.course.findMany({
        where: { instructorId: userId },
        include: {
          instructor: {
            select: { id: true, name: true, email: true },
          },
          _count: {
            select: { enrollments: true },
          },
        },
      });
    }

    if (role === 'STUDENT') {
      return this.prisma.course.findMany({
        where: {
          enrollments: {
            some: { userId },
          },
        },
        include: {
          instructor: {
            select: { id: true, name: true, email: true },
          },
          enrollments: {
            where: { userId },
            select: { progress: true },
          },
        },
      });
    }

    return this.prisma.course.findMany({
      include: {
        instructor: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.course.findUnique({
      where: { id },
      include: {
        instructor: {
          select: { id: true, name: true, email: true },
        },
        materials: {
          orderBy: { order: 'asc' },
        },
        quizzes: true,
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.course.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.course.delete({
      where: { id },
    });
  }
}
