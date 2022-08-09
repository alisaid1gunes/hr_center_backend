import { Arg, Mutation, Resolver } from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { CvParserResponse } from "./dto/cv-parser.response";
import { CvParserService } from "./cv-parser.service";

@Resolver()
export class CvParserResolver {
  @Mutation(() => CvParserResponse)
  async parseCv(@Arg("file", () => GraphQLUpload) file: FileUpload) {
    const CvParser = new CvParserService(file);

    return await CvParser.parseAll();
  }
}
