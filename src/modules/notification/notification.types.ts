import { z } from '../../lib/registry';
import {
  telegramTestSchema,
  telegramTestResponseSchema,
  updateTelegramConfigSchema,
  telegramConfigResponseSchema,
  createTelegramBotSchema,
  updateTelegramBotSchema,
  telegramBotIdSchema,
  telegramBotResponseSchema,
  telegramBotListResponseSchema,
} from './notification.schemas';

export type TelegramTestDTO = z.infer<typeof telegramTestSchema>;
export type TelegramTestResponseDTO = z.infer<
  typeof telegramTestResponseSchema
>;
export type UpdateTelegramConfigDTO = z.infer<
  typeof updateTelegramConfigSchema
>;
export type TelegramConfigResponseDTO = z.infer<
  typeof telegramConfigResponseSchema
>;

export type CreateTelegramBotDTO = z.infer<typeof createTelegramBotSchema>;
export type UpdateTelegramBotDTO = z.infer<typeof updateTelegramBotSchema>;
export type TelegramBotIdDTO = z.infer<typeof telegramBotIdSchema>;
export type TelegramBotResponseDTO = z.infer<typeof telegramBotResponseSchema>;
export type TelegramBotListResponseDTO = z.infer<
  typeof telegramBotListResponseSchema
>;
