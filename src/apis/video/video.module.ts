import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { VideoResolver } from './video.resolver';
import { VideoService } from './video.service';

@Module({
  imports: [TypeOrmModule.forFeature([Video])],
  providers: [VideoResolver, VideoService],
})
export class VideoModule {}
