import {
  IsNotEmpty,
  Matches,
  IsOptional,
  IsDateString,
  IsString,
} from 'class-validator';

class BusyDatesQueryRequestDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
    message: '$property must be formatted as yyyy-mm-dd',
  })
  start: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
    message: '$property must be formatted as yyyy-mm-dd',
  })
  end: string;
}

class BusyDatesParamRequestDTO {
  @IsNotEmpty()
  @IsString()
  id: string;
}

export { BusyDatesQueryRequestDTO, BusyDatesParamRequestDTO };
