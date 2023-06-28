export default interface Profile {
  firstName: string;
  lastName: string;
  visitedDestinations: string[];
  isPublic: boolean;
  description: string;
  ig: string;
  isOwner: boolean;
  profilePicture: { type: string; data: number[] } | null;
  visitedColor1: string;
  visitedColor2: string;
  visitedColor3: string;
  notVisitedColor1: string;
  notVisitedColor2: string;
  notVisitedColor3: string;
  colorBorders: string;
}
