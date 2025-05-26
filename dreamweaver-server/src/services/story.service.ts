// import { StoryClient } from '@story-protocol/core-sdk';

// export class StoryService {
//   private client = StoryClient.newClient({
//     chainId: 137, // Polygon
//     transport: process.env.STORY_PROTOCOL_API_KEY!,
//   });

//   async registerIPAsset(metadata: IPAssetMetadata) {
//     return this.client.ipAsset.register({
//       metadata: JSON.stringify(metadata),
//       policyId: '0', // Default policy
//     });
//   }
// }