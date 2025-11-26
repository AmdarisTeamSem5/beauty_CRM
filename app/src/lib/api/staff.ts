// Re-export from specialists - backend uses "Specialist" not "Staff"
export {
  Specialist as StaffMember,
  CreateSpecialistDto as CreateStaffDto,
  specialistService as staffService,
} from "./specialists";

// Keep old interface for backward compatibility
import type { Specialist } from "./specialists";
export type { Specialist };
