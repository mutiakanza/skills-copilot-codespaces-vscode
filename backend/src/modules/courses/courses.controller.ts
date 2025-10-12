import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CoursesService } from './courses.service';

interface RequestWithUser extends Request {
  user: {
    userId: string;
    role: string;
  };
}

@Controller('courses')
@UseGuards(AuthGuard('jwt'))
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.coursesService.findAll(req.user.userId, req.user.role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Post()
  create(@Body() createCourseDto: any, @Request() req: RequestWithUser) {
    return this.coursesService.create({
      ...createCourseDto,
      instructorId: req.user.userId,
    });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: any) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.coursesService.delete(id);
  }
}
