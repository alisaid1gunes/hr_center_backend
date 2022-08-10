import { Arg, Mutation, Resolver } from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { CvParserResponse } from "./dto/cv-parser.response";
import { CvParserService } from "./cv-parser.service";

import { Service } from "typedi";
@Service()
@Resolver()
export class CvParserResolver {
  constructor(private readonly cvParserService: CvParserService) {}
  @Mutation(() => CvParserResponse)
  async parseCv(@Arg("file", () => GraphQLUpload) file: FileUpload) {
    return await this.cvParserService.parseAll(file);
  }
}
